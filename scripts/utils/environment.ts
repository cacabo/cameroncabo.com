export class Environment {
  public static get(variable: string): string {
    const value = process.env[variable]
    if (value == null) {
      throw new Error(`Failed to find "${value}" in environment`)
    }
    return value
  }

  public static notionAPISecret(): string {
    return Environment.get('NOTION_API_SECRET')
  }

  public static notionBooksDatabaseID(): string {
    return Environment.get('NOTION_BOOKS_DATABASE_ID')
  }
}
