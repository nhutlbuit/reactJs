import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "../../common/table/CustomTable.component";
import { StudentSlice } from "../Student.slice";

function Print(props: any) {
    
    const dispatch = useDispatch();
    const { columns, filter, triggerPrint, onEndPrint} = props;
    const { students } = useSelector((state: any) => state.studentsNew);
    const [filterNoPaging, setFilterNoPaging] = useState(null);
    let timerSubscription: NodeJS.Timeout;
    const [cols, setCols] = useState<any[]>(columns);
    const {actions} = StudentSlice;
    
    useEffect(() => {
        if (columns) {
            const newCols = [...columns];
            newCols[0].minWidth = 120;
            newCols.map(e => e.sort = null);
            setCols(newCols);
        }
    }, [columns]);

    useEffect(() => {
        setFilterNoPaging({...filter, pageNo: -1});
    }, [triggerPrint]);

    useEffect(() => {
        if (filterNoPaging) {
           // dispatch(loadAllDataChange(filterNoPaging));
            dispatch(actions.getStudents(filter));
        }
    }, [filterNoPaging]);

    useEffect(() => {
        if (students.length > 0) { 
            windowPrint();
        }

        return function cleanup() {
            clearTimeout(timerSubscription);
        };

    }, [students])

    const windowPrint = () => {
        timerSubscription = setTimeout(() => { 
            window.print();
            onEndPrint();
        }, 100);
    }

    return (
        <CustomTable
            className={'-striped tb-data-change'}
            columns={cols}
            data={students}
            filter={null}
            onSortChange={null}
        />
    );
}

export default Print;
