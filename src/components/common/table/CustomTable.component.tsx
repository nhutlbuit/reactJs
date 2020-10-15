import React, {useEffect, useState} from "react";
import './CustomTable.component.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCaretDown, faCaretRight, faCaretUp} from "@fortawesome/free-solid-svg-icons";
import {Column, Group, groupBy, hasSort, Row, updateSort} from "./CustomTableCore";
import PropTypes from "prop-types";
import CustomGroup from "./CustomGroup";
import { SortOrder } from "../../../constants/constants";

type GroupProp = {
    className?: string
    group: Group
    columns: Array<Column>
}

type RowProp = {
    className?: string
    row: Row
    columns: Array<Column>
}

const CustomTable = (props: any) => {
    const {filter, onSortChange, noRecordMessage} = props
    const [columns, setColumns] = useState(new Array<Column>());
    const [groups, setGroups] = useState(new Array<Group>());
    const sort = ['', '-sort-asc', '-sort-desc']
    library.add(faCaretUp, faCaretDown, faCaretRight)

    useEffect(() => {
        setColumns(props.columns)
    }, [])

    useEffect(() => {
        let groups: Array<any> = groupBy(props.data, props.groupBy)
        setGroups(groups)
    }, [props.data])

    const onHeaderClick = (column: Column) => {
        let cols = updateSort(column, columns)
        setColumns(cols)
        filter.sortByCols = column.id
        filter.orderBy = SortOrder[column.sort || 0]
        onSortChange({...filter})
    }

    const isDataEmpty = () => {
        return !props.data || props.data.length === 0
    }

    const renderHeader = () => {
        return (
            <div className='ct-thead -header'>
                <div className={'ct-tr'}>
                    {
                        columns.map((c: Column, index: number) => (
                            <div
                                className={c.className + ' ct-th ' + sort[c.sort || 0] + (hasSort(c) && ' -cursor-pointer')}
                                key={index}
                                style={{flex: c.minWidth + ' 0 auto', width: c.minWidth}}
                                onClick={() => hasSort(c) && onHeaderClick(c)}
                            >
                                <span className="fa-stack pull-left"><b>{c.header}</b></span>
                                {
                                    hasSort(c) &&
                                    <span className="fa-stack pull-right">
                                        {c.sort !== SortOrder.DESC && <FontAwesomeIcon icon="caret-up"/>}
                                        {c.sort !== SortOrder.ASC && <FontAwesomeIcon icon="caret-down"/>}
                                    </span>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }

    const renderBody = () => {
        return (
            <div className='ct-tbody'>
                <div className={isDataEmpty() ? 'pt-1 pb-1 text-center' : 'd-none'}>
                    <b>{noRecordMessage}</b>
                </div>
                {
                    groups.map((g: Group, index) => (
                        <CustomGroup
                            key={index}
                            group={g}
                            columns={columns}
                            className={index % 2 != 0 ? '-even' : '-odd'}/>
                    ))
                }
            </div>
        )
    }

    return (
        <div className={'custom-table ' + props.className}>
            <div className="ct-table">
                {renderHeader()}
                {renderBody()}
            </div>
        </div>
    )
}

CustomTable.propTypes = {
    className: PropTypes.string,
    data: PropTypes.array,
    columns: PropTypes.array,
    groupBy: PropTypes.string,
    filter: PropTypes.any,
    noRecordMessage: PropTypes.string,
    onSortChange: PropTypes.func
}

export default CustomTable

