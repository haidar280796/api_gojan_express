type counterIdType = {
    counter_id: string | null,
    pyear: number | null,
    pmonth: number | null,
    prefix?: string | null,
    last_counter: number,
    reset: boolean | null,
    createdAt?: string | null,
    updatedAt?: string | null,
}

export default counterIdType;