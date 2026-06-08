import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";

export function SqlConnection(Host, User, Password, Database, Port) {
    const Connection = mysql.createConnection({
        host: Host,
        user: User,
        password: Password,
        database: Database,
        port: Port
    });

    return Connection;
}

export function UseJson(App) {
    App.use(express.json());
}

export function UseRedirect(App) {
    App.use(express.urlencoded({ extended: true }));
}

export function HashSync(Data, SaltOrRounds) {
    return bcrypt.hashSync(Data, SaltOrRounds);
}

export async function Hash(Data, SaltOrRounds) {
    const hashed = bcrypt.hash(Data, SaltOrRounds);
    return hashed;
}

export function ExpressErrorJson(ErrorMessage, resStatus) {
    return res.status(resStatus).json({
        success: false,
        error: ErrorMessage
    });
}

export function Query(sqlConnection, sql, FailErrorMessage, FailResStatus, SuccessMessage, SuccessResStatus, ...SqlParams) {
    const SQL = sql;

    sqlConnection.query(sql, SqlParams, (err, results) => {
        
        if (err) {
            return res.status(FailResStatus).json({ success: false, error: FailErrorMessage });
        }

        res.status(SuccessResStatus).json({ success: true, message: SuccessMessage, newId: results.insertId });
    });
}
