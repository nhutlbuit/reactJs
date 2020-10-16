import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { customFormatTzYMD } from "../../../common/utils/DateUtils";
import './CopyToClipboard.component.scss';

function CopyToClipboard(props: any) {
    
    const {changeList, triggerCopy, columns, onDoneCopy} = props;
    const dataChangeTable = useRef(null);

    useEffect(()=> {
        copyToClipboard();
    }, [triggerCopy]);

    const copyToClipboard = () => {
        const elToBeCopied = dataChangeTable.current || new Node;
        let range, sel;
        
        // Ensure that range and selection are supported by the browsers
        if (document.createRange && window.getSelection) {
          
          range = document.createRange();
          sel = window.getSelection() || new Selection;
          // unselect any element in the page
          sel.removeAllRanges();
      
          try {
            range.selectNodeContents(elToBeCopied);
            sel.addRange(range);
          } catch (e) {
            range.selectNode(elToBeCopied);
            sel.addRange(range);
          }
      
          document.execCommand('copy');
        }
      
        sel?.removeAllRanges();
        toast.info("Copied to Clipboard!");
        onDoneCopy();
      };

    return (
        <table ref={dataChangeTable} >
            <tbody>
                <tr style={{ backgroundColor: '#0286dc' }}>
                    {columns?.map((item: any, index: number) => (
                        <th key={index}>{item?.header}</th>
                    ))}
                </tr>
                {changeList?.map((row: any, index: number) => (
                    <tr key={index}>
                         {columns?.map((column: any, key: number) => (
                        <td key={key}>{column.dataType === 'Date' ? customFormatTzYMD(row[column.accessor], column.format) : row[(column?.accessor)]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default CopyToClipboard;
