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
     * Querys your database to run SQL
     * SqlParams - the Parameters for your SQL table or database
     */
    Query(sqlConnection: Stream.Duplex | null | undefined, sql: string, SqlParams: any[], FailErrorMessage: string, FailResStatus: number, SuccessMessage: string, SuccessResStatus: number): Response | void
}

declare module "backend-simplifier" {
  const wrapper: PackageWrapper;
  export = wrapper;
}
