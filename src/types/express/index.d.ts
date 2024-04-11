declare namespace Express {
  interface Request {
    user: {
      sub: `${string}-${string}-${string}-${string}-${string}`
      role: string
    }
  }
}
