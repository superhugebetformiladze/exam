import React, {useEffect, useState} from "react";
import { TimeTableData } from "../types/types";

const useFetchTimeTableGroup = (data: string): TimeTableData => {
    const [timeTableData, setTimeTableData] = useState<TimeTableData>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {

                if (data === "") {
                    setTimeTableData([]);
                    setLoading(false);
                    return;
                }


                let response;
                const encodedData = encodeURIComponent(data)

                response = await fetch(`https://vm.nathoro.ru/timetable/by-group/${encodedData}`)
                if (response.ok) {
                    const data = await response.json();
                    setTimeTableData(data);
                    setLoading(false);
                    return;
                }

                response = await fetch(`https://vm.nathoro.ru/timetable/by-teacher/${encodedData}`)
                if (response.ok) {
                    const data = await response.json();
                    setTimeTableData(data);
                    setLoading(false);
                    return;
                }

                response = await fetch(`https://vm.nathoro.ru/timetable/by-room/${encodedData}`)
                if (response.ok) {
                    const data = await response.json();
                    setTimeTableData(data);
                    setLoading(false);
                    return;
                }

                setTimeTableData([]);
                setLoading(false);

            } catch (error) {
                console.error("Error:", error)
                setTimeTableData([]);
                setLoading(false);
                
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [data])

    if (loading) {
        return [] as TimeTableData;
      }

    return timeTableData;
};

export default useFetchTimeTableGroup;