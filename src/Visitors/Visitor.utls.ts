import { getRepository } from "typeorm";
import { Guardian } from "./Guardian/Guardian.entity";
import { Kid } from "./Kid/Kid.entity";
import { Visit } from "./Visit/Visit.entity";

export class VisitorUtils {
  static getVisitor = async (phone: string) => {
    try {
      let guardians = await getRepository(Guardian).query(
        "SELECT id, phone_number guardians FROM guardians WHERE phone_number = $1",
        [phone]
      );
      let kids = await getRepository(Kid).query(
        `SELECT
        k.id,
        k.name,
        to_char(k.date_of_birth, 'YYYY-MM-DD') AS date_of_birth,
        k.gender,
        to_char(k.created_at, 'YYYY-MM-DD') AS registered_on,
        k.guardain_id,
        u.station,
        to_char(visits.last_visit, 'YYYY-MM-DD') AS last_visit,
        visits.total_number_of_visits
        FROM kids AS k
        JOIN
        users AS u
        ON
        u.id = k.user
        JOIN
      (
         SELECT kid_id, MAX(visit_date) AS last_visit, COUNT(kid_id) AS total_number_of_visits FROM visits
         GROUP BY
         kid_id
         ) as visits
          ON
          visits.kid_id = k.id`
      );

      for (const guardian of guardians) {
        let kids_array = [];
        for (const kid of kids) {
          if (kid.guardain_id === guardian.id) {
            kids_array.push(kid);
          }
        }
        guardian.kids = kids_array;
      }
      if (guardians.length > 0) {
        return guardians[0];
      } else {
        return (guardians[0] = undefined);
      }
    } catch (error) {
      return error;
    }
  };

  static getAllVisitor = async () => {
    try {
      let kids = await getRepository(Guardian).query(`
      SELECT
      g.phone_number AS guardians,
      k.name,
      to_char(k.date_of_birth, 'YYYY-MM-DD') AS date_of_birth,
      k.gender,
      to_char(k.reg_on, 'YYYY-MM-DD') AS registered_on,
      u.station,
      to_char(visit.last_visit, 'YYYY-MM-DD') AS last_visit,
      visit.total_number_of_visits,
      uu.station AS last_visit_station
      FROM kids AS k
      JOIN
      guardians AS g
      ON
      k.guardain_id = g.id
      JOIN
      users AS u
      ON
      u.id = k.user
      JOIN
      (
         SELECT kid_id, MAX(visit_date) AS last_visit, COUNT(kid_id) AS total_number_of_visits, MAX(id) AS visit_id FROM visits
         GROUP BY
         kid_id
      ) AS visit
        ON
          visit.kid_id = k.id
      JOIN
        visits AS v
      ON
        v.id = visit.visit_id
      JOIN
        users AS uu
      ON
        uu.id = v.user
          ORDER BY registered_on DESC`);
      return kids;
    } catch (error) {
      return error;
    }
  };

  static getDetail = async (phone: string) => {
    try {
      let guardians = await getRepository(Guardian).query(
        `SELECT id, phone_number FROM guardians WHERE phone_number = $1`,
        [phone]
      );
      let kids = await getRepository(Kid).query(
        "SELECT * FROM kids WHERE guardain_id = $1",
        [guardians[0].id]
      );
      let visits = await getRepository(Visit).query(
        "SELECT v.*, u.station FROM visits AS v JOIN users AS u ON u.id = v.user WHERE v.guardain_id = $1",
        [guardians[0].id]
      );
      for (const guardian of guardians) {
        let kids_array = [];
        for (const kid of kids) {
          if (guardian.id === kid.guardain_id) {
            kids_array.push(kid);
            let visits_array = [];
            for (const visit of visits) {
              if (kid.id === visit.kid_id) {
                visits_array.push(visit);
              }
            }
            kid.visits = visits_array;
          }
        }
        guardian.kids = kids_array;
      }
      return guardians;
    } catch (error) {
      return error;
    }
  };

  static stationStatus = async (start?: string, end?: string) => {
    try {
      return await getRepository(Visit).query(
        `SELECT u.station, count(v.id) AS number_of_visits FROM visits AS v
        JOIN
        users AS u
        ON
        u.id = v.user
        WHERE v.visit_date BETWEEN $1 AND $2
        GROUP BY
        u.station`,
        [start, end]
      );
    } catch (error) {
      return error;
    }
  };

  static dateWiseVisits = async (start?: string, end?: string, station?: string) => {
    try {
      return await getRepository(Visit).query(`
      SELECT
      COUNT(v.id) AS visits, to_char(visit_date, 'YYYY-MM-DD') AS visit_date
      FROM
      visits AS v
      JOIN
      users AS u
      ON
      u.id = v.user
      WHERE to_char(visit_date, 'YYYY-MM-DD') BETWEEN $1 AND $2 AND u.station = $3
      GROUP BY
      to_char(visit_date, 'YYYY-MM-DD'),
      u.station
      `, [start, end, station]);
      
    } catch (error) {
      return error;
    }
  };

  static monthWiseVisits = async (start?: string, end?: string, station?: string) => {
    try {
      return await getRepository(Visit).query(`
      SELECT
      u.station, to_char(visit_date, 'YYYY-MM') As visit_month, COUNT(v.id) AS visits
      FROM
      visits AS v
      JOIN
      users AS u
      ON
      u.id = v.user
      WHERE to_char(visit_date, 'YYYY-MM') BETWEEN $1 AND $2 AND u.station = $3
      GROUP BY
      to_char(visit_date, 'YYYY-MM'),
      u.station
      `, [start, end, station]);
      
    } catch (error) {
      return error;
    }
  };

  static yearWiseVisits = async (start?: string, end?: string, station?: string) => {
    try {
      return await getRepository(Visit).query(`
      SELECT
      u.station, to_char(visit_date, 'YYYY') As visit_year, COUNT(v.id) AS visits
      FROM
      visits AS v
      JOIN
      users AS u
      ON
      u.id = v.user
      WHERE to_char(visit_date, 'YYYY') BETWEEN $1 AND $2 AND u.station = $3
      GROUP BY
      to_char(visit_date, 'YYYY'),
      u.station
      `, [start, end, station]);
      
    } catch (error) {
      return error;
    }
  };
}
