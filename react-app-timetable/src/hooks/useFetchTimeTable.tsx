import { useEffect, useState, useCallback } from "react";
import { TimeTableData } from "../types/types";

const useFetchTimeTableGroup = (group: string): TimeTableData => {
    const [timeTableData, setTimeTableData] = useState<TimeTableData>([])

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(`https://vm.nathoro.ru/timetable/by-group/${group}`);
            const data: TimeTableData = await response.json();
            setTimeTableData(data);
        } catch (error) {
            console.error("Error:", error)
        }
    }, [group])

    useEffect(() => {
        fetchData();
    }, [])

    return timeTableData;
};

export default useFetchTimeTableGroup;