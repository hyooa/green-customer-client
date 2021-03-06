import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';
// import { useNavigate } from 'react-router-dom';

const CreateCustomer2 = ({ onChange, onSubmit, addCustomer, onHome }) => { // ๐
    // const navigate = useNavigate();

    // ์ฐํธ๋ฒํธ ๊ด๋ฆฌํ๊ธฐ 
    const onAddData = (data) => {
        console.log(data);
        const postAdd = data.address;
        onChange({
            target : {
                name : 'c_add',
                value : postAdd
            }
        })
    }

    // ํ์์ฐฝ ์ํ ๊ด๋ฆฌ 
    const [ isPopupOpen, setIsPopupOpen ] = useState(false);

    // ํ์์ฐฝ ์ํ true๋ก ๋ณ๊ฒฝ 
    const openPostCode = () => {
        setIsPopupOpen(true);
    }

    // ํ์์ฐฝ ์ํ false๋ก ๋ณ๊ฒฝ 
    const closePostCode = () => {
        setIsPopupOpen(false);
    }

    // ํผ submit ์ด๋ฒคํธ ๐ ์ ๊ท ๋ฑ๋ก
    const onSubmitch = (e) => {
        // form์ ์๋ ์ฐ๊ฒฐ๋ ์ด๋ฒคํธ๋ฅผ ์ ๊ฑฐ (๋ค๋ฅธ ํ์ด์ง๋ก ๋์ด๊ฐ๋๊ฑธ ๋ฐฉ์ง)
        e.preventDefault();
        
        // ์ ํ๋ฒํธ๊ฐ ์ซ์์ธ์ง ์ฒดํฌํ๊ธฐ
        if(isNaN(addCustomer.c_phone)) {
            alert("์ ํ๋ฒํธ๋ ์ซ์๋ง ์๋ ฅํ์ธ์.");
        }

        // input์ ๊ฐ์ด ์๋์ง ์ฒดํฌํ๊ณ 
        // ์๋ ฅ์ด ๋ค ๋์ด์์ผ๋ฉด post ์ ์ก
        if(addCustomer.c_name !== "" && addCustomer.c_phone !== "" &&
        addCustomer.c_birth !== "" && addCustomer.c_gender !== "" &&
            addCustomer.c_add !== "" && addCustomer.c_adddetail !== "") {
                onSubmit(); // ๋ฑ๋ก ํด์ฃผ๋ ํจ์
                // navigate("/");
                onHome();
            }
    }

    return (
        <div>
            <h2>์ ๊ท ๊ณ ๊ฐ ๋ฑ๋กํ๊ธฐ REDUX</h2>
            <form onSubmit={onSubmitch}> 
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>์ด๋ฆ</TableCell>
                            <TableCell>
                                {/* form์ ์๋ ฅ๋๋ ๊ฐ๋ค์ ๊ด๋ฆฌ๊ฐ ๋์ด์ผ๋จ > useState */}
                                <input
                                name="c_name"
                                type="text"
                                value={addCustomer.c_name}
                                onChange={onChange}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>์ฐ๋ฝ์ฒ</TableCell>
                            <TableCell>
                                <input
                                name="c_phone"
                                type="text"
                                value={addCustomer.c_phone}
                                onChange={onChange}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>์๋์์ผ</TableCell>
                            <TableCell>
                                <input
                                name="c_birth"
                                type="date"
                                value={addCustomer.c_birth}
                                onChange={onChange}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>์ฑ๋ณ</TableCell>
                            <TableCell>
                                ์ฌ์ฑ<input
                                name="c_gender"
                                type="radio"
                                value="์ฌ์ฑ"
                                onChange={onChange}
                                />
                                ๋จ์ฑ<input
                                name="c_gender"
                                type="radio"
                                value="๋จ์ฑ"
                                onChange={onChange}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>์ฃผ์</TableCell>
                            <TableCell>
                                <input
                                name="c_add"
                                type="text"
                                value={addCustomer.c_add}
                                onChange={onChange}
                                />
                                <input
                                name="c_adddetail"
                                type="text"
                                value={addCustomer.c_adddetail}
                                onChange={onChange}
                                />

                                <button type='button' onClick={openPostCode}>์ฐํธ๋ฒํธ๊ฒ์</button>
                                <div id="popupDom">
                                    {/* ๋ค์ api */}
                                    {
                                        isPopupOpen && (
                                            <PopupDom>
                                                <PopupPostCode
                                                onClose={closePostCode} 
                                                onAddData={onAddData}
                                                />
                                            </PopupDom>
                                        )
                                    }
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>
                                <button id='button' type='submit'>๋ฑ๋ก</button>
                                <button id='button' type='reset'>์ทจ์</button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </form>
        </div>
    );
};

export default CreateCustomer2;