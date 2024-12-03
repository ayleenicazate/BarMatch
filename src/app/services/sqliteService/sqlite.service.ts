import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CapacitorSQLite, capSQLiteValues, JsonSQLite } from '@capacitor-community/sqlite';
import { Device } from '@capacitor/device';
import { Preferences } from '@capacitor/preferences';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  public dbReady: BehaviorSubject<boolean>;
  public isWeb: boolean;
  public isIOS: boolean;
  public dbName: string;



  constructor(private http: HttpClient) {
    this.dbReady = new BehaviorSubject(false);
    this.isWeb = false;
    this.isIOS = false;
    this.dbName = '';
   }


   async init() {

    const info = await Device.getInfo();
    // CapacitorSQLite no tiene disponible el metodo requestPermissions pero si existe y es llamable
    const sqlite = CapacitorSQLite as any;

    // Si estamos en android, pedimos permiso
    if (info.platform == 'android') {
      try {
        await sqlite.requestPermissions();
      } catch (error) {
        console.error("Esta app necesita permisos para funcionar")
      }
      // Si estamos en web, iniciamos la web store
    } else if (info.platform == 'web') {
      this.isWeb = true;
      await sqlite.initWebStore();
    } else if (info.platform == 'ios') {
      this.isIOS = true;
    }

    // Arrancamos la base de datos
    this.setupDatabase();

  }

  async setupDatabase() {

    const dbSetup = await Preferences.get({ key: 'first_setup_key' })

    // Sino la hemos creado, descargamos y creamos la base de datos
    if (!dbSetup.value) {
      this.downloadDatabase();
    } else {
      // Nos volvemos a conectar
      this.dbName = await this.getDbName();
      await CapacitorSQLite.createConnection({ database: this.dbName });
      await CapacitorSQLite.open({ database: this.dbName })
      this.dbReady.next(true);
    }

  }

  async downloadDatabase() {
    try {
        const jsonExport = await this.http.get('assets/db/db.json').toPromise() as JsonSQLite;
        const jsonstring = JSON.stringify(jsonExport);

        const isValid = await CapacitorSQLite.isJsonValid({ jsonstring });
        
        if (!isValid.result) {
            throw new Error('JSON no válido para SQLite');
        }

        this.dbName = jsonExport.database;
        
        // Importamos la base de datos con los datos iniciales
        const importResult = await CapacitorSQLite.importFromJson({ jsonstring });
                
        // Creamos y abrimos la conexión
        await CapacitorSQLite.createConnection({ database: this.dbName });
        await CapacitorSQLite.open({ database: this.dbName });

        // Si estamos en web, guardamos explícitamente en el store
        if (this.isWeb) {
            await CapacitorSQLite.saveToStore({ database: this.dbName });
        }

        // Guardamos las preferencias
        await Preferences.set({ key: 'first_setup_key', value: '1' });
        await Preferences.set({ key: 'dbname', value: this.dbName });

        this.dbReady.next(true);
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
        throw error;
    }
  }


  async getDbName() {

    if (!this.dbName) {
      const dbname = await Preferences.get({ key: 'dbname' })
      if (dbname.value) {
        this.dbName = dbname.value
      }
    }
    return this.dbName;
  }


  async readDeporte(deporteId: number) {
    let sql = 'SELECT * FROM deportes WHERE deporte_id = ?';
    const dbName = await this.getDbName();

    return CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: [deporteId]
    }).then((response: capSQLiteValues) => {
      if (this.isIOS && response.values.length > 0) {
        response.values.shift();
      }
      return response.values.length > 0 ? response.values[0] : null;
    }).catch(err => Promise.reject(err));
  }

  async readEncuentros(deporteId: number, fecha: string) {
    let sql = `
      SELECT e.*, d.nombre as deporte_nombre 
      FROM encuentros e 
      JOIN deportes d ON e.deporte_id = d.deporte_id 
      WHERE e.deporte_id = ? AND e.fecha = ?
    `;
    const dbName = await this.getDbName();

    return CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: [deporteId, fecha]
    }).then((response: capSQLiteValues) => {
      if (this.isIOS && response.values.length > 0) {
        response.values.shift();
      }
      return response.values;
    }).catch(err => {
      console.error('Error en readEncuentros:', err);
      return Promise.reject(err);
    });
  }

  async readBares(barId: number) {
    let sql = `SELECT * FROM bar WHERE bar_id = ?`;
    const dbName = await this.getDbName();

    return CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: [barId]
    }).then((response: capSQLiteValues) => {
      if (this.isIOS && response.values.length > 0) {
        response.values.shift();
      }
      return response.values;
    }).catch(err => {
      console.error('Error en readBares:', err);
      return Promise.reject(err);
    });
  }

  
  async readEncuentroBar(encuentroId: number) {
    let sql = `
      SELECT * FROM encuentro_bar WHERE encuentro_id = ? 
    `;
    const dbName = await this.getDbName();

    return CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: [encuentroId]
    }).then((response: capSQLiteValues) => {
      if (this.isIOS && response.values.length > 0) {
        response.values.shift();
      }
      return response.values;
    }).catch(err => {
      console.error('Error en readEncuentroBar:', err);
      return Promise.reject(err);
    });
    ;
  }

  async createReserva(reserva: {
    username: string;
    encuentro_id: number;
    bar_id: number;
    cantidad_personas: number;
    fecha_reserva: string;
  }) {
    try {
      const sql = `
        INSERT INTO reservas (
          username, 
          encuentro_id, 
          bar_id, 
          cantidad_personas, 
          fecha_reserva
        ) 
        VALUES (?, ?, ?, ?, ?)
      `;

      const dbName = await this.getDbName();
      
      const result = await CapacitorSQLite.executeSet({
        database: dbName,
        set: [{
          statement: sql,
          values: [
            reserva.username,
            reserva.encuentro_id,
            reserva.bar_id,
            reserva.cantidad_personas,
            reserva.fecha_reserva
          ]
        }]
      });

      // Si estamos en web, guardamos en el store
      if (this.isWeb) {
        await CapacitorSQLite.saveToStore({ database: dbName });
      }

      return { success: true, reserva: reserva };

    } catch (error) {
      console.error('Error al crear reserva en SQLite:', error);
      return Promise.reject(error);
    }
  }

  async getReservasByUsername(username: string) {
    try {
      const sql = `
        SELECT r.*, 
               e.nombre as encuentroNombre,
               e.fecha,
               d.nombre as deporte,
               b.nombre as barNombre,
               b.direccion as barDireccion
        FROM reservas r
        JOIN encuentros e ON r.encuentro_id = e.encuentro_id
        JOIN deportes d ON e.deporte_id = d.deporte_id
        JOIN bar b ON r.bar_id = b.bar_id
        WHERE r.username = ?
      `;

      const dbName = await this.getDbName();

      const result = await CapacitorSQLite.query({
        database: dbName,
        statement: sql,
        values: [username]
      });

      if (this.isIOS && result.values.length > 0) {
        result.values.shift();
      }
      return result.values;

    } catch (error) {
      console.error('Error al obtener reservas de SQLite:', error);
      return [];
    }
  }

  // Método para limpiar todas las reservas (útil para testing)
  async clearReservas() {
    localStorage.removeItem('reservas');
    return { success: true };
  }

  async getUserByUsername(username: string) {
    const sql = 'SELECT * FROM usuarios WHERE username = ?';
    const dbName = await this.getDbName();

    return CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: [username]
    }).then((response: capSQLiteValues) => {
      if (this.isIOS && response.values.length > 0) {
        response.values.shift();
      }
      return response.values.length > 0 ? response.values[0] : null;
    }).catch(err => {
      console.error('Error al obtener usuario:', err);
      return Promise.reject(err);
    });
  }

}
