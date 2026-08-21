import { ITableProps } from '@/types/custom-table.types';

const CustomTable = <T extends object>({ columns, data }: ITableProps<T>) => {
  return (
    <div className="custom-scrollbar dashboard-card-container overflow-x-auto p-0">
      <table className="border-border divide-border min-w-full divide-y">
        <thead>
          <tr className="bg-muted/60">
            {columns?.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="text-secondary px-5 py-4 text-left text-xs font-bold tracking-wider text-nowrap uppercase opacity-70"
              >
                {column?.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-border/40 divide-y">
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns?.map((column, colIndex) => (
                <td key={colIndex} className="text-secondary px-5 py-4 text-sm whitespace-nowrap">
                  {'accessor' in column && column?.accessor
                    ? String(row[column?.accessor] ?? '')
                    : column?.cell?.(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
