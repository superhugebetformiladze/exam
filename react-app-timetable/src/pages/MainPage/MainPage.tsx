import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import TableComponent from "../../components/Table/TableMin";
import useFetchTimeTableGroup from "../../hooks/useFetchTimeTableGroup";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const MainPage = () => {
    const [input, setInput] = useState<string>("");
    const [searchInput, setSearchInput] = useState<string>(input);
    const [tableData, setTableData] = useState<string>("")
    const timeTableData = useFetchTimeTableGroup(searchInput || tableData);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSearchInput(input);
    };

    const handleClear = () => {
        setInput("");
        setSearchInput("");
        setTableData("");
    };

    const handleTableClick = (data: string) => {
        setTableData(data);
        setInput(data);
        setSearchInput(data);
    }

    return (
        <Container>
            <Form className="mb-4 mt-4" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="groupSearch">
                    <Form.Control 
                        type="text" 
                        placeholder="Поиск по группе" 
                        value={input} 
                        onChange={handleInputChange} 
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="me-2">
                    Найти
                </Button>
                <Button variant="secondary" onClick={handleClear}>
                    Очистить
                </Button>
            </Form>

            {(searchInput || tableData) && timeTableData.length > 0 && timeTableData.map((data, index) => (
                <TableComponent key={index} data={data} weekIndex={index} onTableClick={handleTableClick}></TableComponent>
            ))}
        </Container>
    )
}

export default MainPage;
