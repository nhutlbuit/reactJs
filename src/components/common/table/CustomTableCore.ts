import {ReactElement} from "react";
import { SortOrder, DataTypeEnum } from "../../../constants/constants";

export interface Column {
    id: string
    header: string
    accessor: string
    className?: string
    dataType?: DataTypeEnum
    format?: string
    minWidth: number
    sort?: SortOrder
    cell?: ReactElement
    icons?: Array<ReactElement>
}

export interface Group {
    groupId: number
    expanded: boolean
    rows: Array<Row>
}

export interface Row {
    expanded: boolean
    isRoot: boolean
    item: any
}

export const groupBy = (array: Array<any>, key: string) => {
    let groupMap = array.reduce((map: Map<any, Array<any>>, currentItem, currentIndex) => {
        let id = !!key ? currentItem[key] : currentIndex
        let item = {item: currentItem, isRoot: false, expanded: false}
        map = map.size > 0 ? map : new Map()
        map.has(id) ? map.get(id)?.push(item) : map.set(id, [item])
        return map;
    }, [])

    let result = Array.from(groupMap.keys()).map(key => {
        let list = groupMap.get(key)
        if (list.length > 1) {
            list[0].isRoot = true
        }
        return {
            groupId: key,
            rows: list
        }
    })

    return result.slice()
}

export const updateSort = (column: Column, columns: Array<Column>): Array<Column> => {
    let sort = column.sort
    resetColumnSort(columns)
    switch (sort) {
        case SortOrder.DEFAULT:
            column.sort = SortOrder.ASC
            break
        case SortOrder.ASC:
            column.sort = SortOrder.DESC
            break
        default:
            column.sort = SortOrder.ASC
            break
    }
    return columns.slice()
}

export const hasSort = (c: Column) => {
    return c.sort != null
}

export const resetColumnSort = (columns: Array<Column>) => {
    columns.forEach(c => hasSort(c) && (c.sort = SortOrder.DEFAULT))
}

