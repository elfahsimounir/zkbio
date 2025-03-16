export type Employee = {
    id: any
    // amount: number
    firstName:string
    lastName:string
    workTime:string
    status: "pending" | "processing" | "success" | "failed"
    email: string
  }