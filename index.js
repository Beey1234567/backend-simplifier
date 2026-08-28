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

export function SqlPool(Host, User, Password, Database, Port) {
    const Pool = mysql.createPool({
        host: Host,
        user: User,
        password: Password,
        database: Database,
        port: Port
    })

    return Pool;
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
    const hashed = await bcrypt.hash(Data, SaltOrRounds);
    return hashed;
}

export function ExpressErrorJson(res, ErrorMessage, resStatus) {
    return res.status(resStatus).json({
        success: false,
        error: ErrorMessage
    });
}

export function ExpressSuccessJson(res, Message, resStatus) {
    return res.status(resStatus).json({
        success: true,
        message: Message
    });
}

export function Send(res, message) {
    res.send(message);
}

export function Query(res, sqlConnection, sql, FailErrorMessage, FailResStatus, SuccessMessage, SuccessResStatus, ...SqlParams) {
    const SQL = sql;

    const finalParams = SqlParams.length > 0 ? SqlParams : undefined;

    sqlConnection.query(sql, finalParams, (err, results) => {
        
        if (err) {
            if (res) {
                return res.status(FailResStatus).json({ success: false, error: FailErrorMessage });
            } else {
                console.error(FailErrorMessage);
            }
        }
        
        if (res) {
            res.status(SuccessResStatus).json({ success: true, message: SuccessMessage, newId: results.insertId });
        } else {
            console.log(SuccessMessage);
        }
    });
}

export function Listen(app, port, successListenFunction) {
    app.listen(port,() => {
        successListenFunction()
    });
}

export function Get(App, name, SuccessFunc, ErrorFunc) {
    App.get(name, async (req, res) => {
        try {
            await SuccessFunc(req, res)
        } catch (err) {
            ErrorFunc(err, req, res)
        }
    });
}

export function Post(App, name, SuccessFunc, ErrorFunc) {
    App.post(name, async (req, res) => {
        try {
            await SuccessFunc(req, res)
        } catch (err) {
            ErrorFunc(err, req, res)
        }
    });
}

export function Patch(App, name, SuccessFunc, ErrorFunc) {
    App.patch(name, async (req, res) => {
        try {
            await SuccessFunc(req, res)
        } catch (err) {
            ErrorFunc(err, req, res)
        }
    });
}

export function Put(App, name, SuccessFunc, ErrorFunc) {
    App.put(name, async (req, res) => {
        try {
            await SuccessFunc(req, res)
        } catch (err) {
            ErrorFunc(err, req, res)
        }
    });
}

export function Delete(App, name, SuccessFunc, ErrorFunc) {
    App.delete(name, async (req, res) => {
        try {
            await SuccessFunc(req, res)
        } catch (err) {
            ErrorFunc(err, req, res)
        }
    });
}

export function CompareSync(Data, encrypted) {
    return bcrypt.compareSync(Data, encrypted);
}

export async function Compare(Data, encrypted) {
    const result = await bcrypt.compare(Data, encrypted);
    
    return result;
}

export async function GenSalt(Rounds = 10, minor = undefined) {
    const result = await bcrypt.genSalt(Rounds, minor);

    return result;
}

export function GenSaltSync(Rounds = undefined, minor = undefined) {
    const result = bcrypt.genSaltSync(Rounds, minor)

    return result;
}

export function GetRounds(encrypted) {
    const result = bcrypt.getRounds(encrypted);

    return result;
}
