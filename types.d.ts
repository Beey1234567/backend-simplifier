export interface PackageWrapper {
    /**
     * Creates an SQL connection that is synchronized.
     */
    SqlConnection(Host: string, User: string, Password: string, Database: string, Port: number): Stream.Duplex | null | undefined
    /**
     * Allows express to use json.
     */
    UseJson(App: Express): void
    /**
     * Allows express to use redirect.
     */
    UseRedirect(App: Express): void
    /**
     * Hashes data only using synchronization.
     */
    HashSync(Data: string | Buffer, SaltOrRounds: number | string): string
    /**
     * Hashes data asynchronously
     */
    Hash(Data: string | Buffer, SaltOrRounds: number | string): Promise<string>
    /**
     * Makes an express error for JSON
     */
    ExpressErrorJson(ErrorMessage: string, resStatus: number): Response
    /**
     * Makes an express success for JSON
     */
    ExpressSuccessJson(Message: string, resStatus: number): Response

    /**
     * Uses request's built-in send to send a message to the HTML.
     */
    Send(res: Response, message: string | Buffer | Object | Array)
    /**
     * Querys your database to run SQL
     * SqlParams - the Parameters for your SQL table or database
     */
    Query(sqlConnection: Stream.Duplex | null | undefined, sql: string, FailErrorMessage: string, FailResStatus: number, SuccessMessage: string, SuccessResStatus: number, SqlParams: any[]): Response | void,
    /**
     * Makes the server listen to incoming requests
     */
    Listen(app: Express, port: number, successListenFunction: () => void): void;
    /**
     * Makes the server listen for a GET request with a specified name
     */
    Get(App: Express, name: string, SuccessFunc: (req: Request, res: Response) => void | Promise<any>, ErrorFunc: (err: any, req: Request, res: Response) => void | Promise<any>)
    /**
     * Makes the server listen for a POST request with a specified name
     */
    Post(App: Express, name: string, SuccessFunc: (req: Request, res: Response) => void | Promise<any>, ErrorFunc: (err: any, req: Request, res: Response) => void | Promise<any>)
    /**
     * Makes the server listen for a PATCH request with a specified name
     */
    Patch(App: Express, name: string, SuccessFunc: (req: Request, res: Response) => void | Promise<any>, ErrorFunc: (err: any, req: Request, res: Response) => void | Promise<any>)
    /**
     * Makes the server listen for a PUT request with a specified name
     */
    Put(App: Express, name: string, SuccessFunc: (req: Request, res: Response) => void | Promise<any>, ErrorFunc: (err: any, req: Request, res: Response) => void | Promise<any>)
    /**
     * Makes the server listen for a DELETE request with a specified name
     */
    Delete(App: Express, name: string, SuccessFunc: (req: Request, res: Response) => void | Promise<any>, ErrorFunc: (err: any, req: Request, res: Response) => void | Promise<any>)
    /**
     * Uses bcrypt's compare synchronously
     */
    CompareSync(Data: string | Buffer,  encrypted: string): boolean
    /**
     * Uses bcrypt's compare
     */
    Compare(Data: string | Buffer, encrypted: string): Promise<boolean>
}

declare module "backend-simplifier" {
  const wrapper: PackageWrapper;
  export = wrapper;
}
