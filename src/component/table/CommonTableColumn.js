import React from 'react';

function CommonTableColumn ({ children }) {
    return (
        <td className="common-table-column">
            {
                children
            }
        </td>
    )
}

export default CommonTableColumn;
