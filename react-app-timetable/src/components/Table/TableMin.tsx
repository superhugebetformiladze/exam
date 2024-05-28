// Table.tsx
import React from "react";
import { TimeTableEntry, Day, Lesson, Teacher } from "../../types/types";
import Table from 'react-bootstrap/Table';

interface TableProps {
    data: TimeTableEntry;
    weekIndex: number;
    onTableClick: (data: string) => void;
}

const dayNames = ["Пнд", "Втр", "Срд", "Чтв", "Птн", "Сбт", "Вс"];

const TableComponent: React.FC<TableProps> = ({ data, weekIndex, onTableClick }) => {

    return (
        <div>
            <h2>Неделя {weekIndex + 1}</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th></th>
                        <th>1-я пара</th>
                        <th>2-я пара</th>
                        <th>3-я пара</th>
                        <th>4-я пара</th>
                        <th>5-я пара</th>
                        <th>6-я пара</th>
                        <th>7-я пара</th>
                        <th>8-я пара</th>
                    </tr>
                </thead>
                <tbody>
                    {data.days.map((day: Day, dayIndex: number) => (
                        <tr key={dayIndex}>
                            <td>{dayNames[dayIndex]}</td>
                            {day.lessons.map((lesson: Lesson | null, lessonIndex: number) => (
                                <td
                                    key={lessonIndex}
                                    style={lesson ? { backgroundColor: "#96ee9e" } : { backgroundColor: "#e9be86" }}
                                >
                                    {lesson?.group?.name ? (
                                        <button
                                            onClick={() => onTableClick(lesson.group.name)}
                                            style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textWrap: "nowrap", padding: "0"}}
                                        >
                                            {lesson.group.name}
                                        </button>
                                    ) : (
                                        null
                                    )}
                                    <br />
                                    {lesson?.subject?.name}
                                    <br />
                                    {lesson?.subject?.teacher ? (
                                        <button
                                            onClick={() => onTableClick(lesson.subject.teacher.fullName)}
                                            style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textWrap: "nowrap", padding: "0"}}
                                        >
                                            {lesson.subject.teacher.fullName}
                                        </button>
                                    ) : (
                                        null
                                    )}
                                    <br />
                                    {lesson?.room?.name ? (
                                        <button
                                            onClick={() => onTableClick(lesson.room.name)}
                                            style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textWrap: "nowrap", padding: "0"}}
                                        >
                                        {lesson.room.name}
                                        </button>
                                    ) : (
                                        null
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default TableComponent;
