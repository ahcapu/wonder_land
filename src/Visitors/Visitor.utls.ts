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
      to_char(g.created_at, 'YYYY-MM-DD') AS registered_on,
      u.station,
      to_char(visits.last_visit, 'YYYY-MM-DD') AS last_visit,
      visits.total_number_of_visits
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
         SELECT kid_id, MAX(visit_date) AS last_visit, COUNT(kid_id) AS total_number_of_visits FROM visits
         GROUP BY
         kid_id
         ) as visits
          ON
          visits.kid_id = k.id
          ORDER BY registered_on DESC`);
      return kids;
    } catch (error) {
      return error;
    }
  };

  static stationStatus = async (start?: string, end?: string) => {
    try {
      let visits = await getRepository(Visit).query(
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

      let date_wise_and_station_wise = await getRepository(Visit).query(`
      SELECT
      u.station, to_char(visit_date, 'YYYY-MM-DD') AS visit_date, COUNT(v.id) AS visits
      FROM
      visits AS v
      JOIN
      users AS u
      ON
      u.id = v.user
      GROUP BY
      to_char(visit_date, 'YYYY-MM-DD'),
      u.station
      `);

      let month_wise_and_station_wise = await getRepository(Visit).query(`
      SELECT
      u.station, to_char(visit_date, 'YYYY-MM') As visit_month, COUNT(v.id) AS visits
      FROM
      visits AS v
      JOIN
      users AS u
      ON
      u.id = v.user
      GROUP BY
      to_char(visit_date, 'YYYY-MM'),
      u.station
      `);
      return {
        total_visits: visits,
        daily_visits: date_wise_and_station_wise,
        monthly_visits: month_wise_and_station_wise,
      };
    } catch (error) {
      return error;
    }
  };
}
