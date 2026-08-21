'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDebounce } from '@/hooks/useDebounce';
import useSetSearchQueryInURL from '@/hooks/useSetSearchQueryInURL';
import { cn } from '@/lib/utils';
import { ITableFilter } from '@/types/table-filter.types';
import { Download, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DynamicTableFilterBarProps {
  fields: ITableFilter[];
  showExport?: boolean;
  exportText?: string;
  onExport?: () => void;
}

const DynamicTableFilterBar = ({
  fields,
  showExport = false,
  exportText = 'Export CSV',
  onExport,
}: DynamicTableFilterBarProps) => {
  const { setMultipleQueries, getQueryObject } = useSetSearchQueryInURL();
  const queryParams = getQueryObject();

  // 1. Search Logic & State Synchronization (State Derivation Method)
  const searchField = fields.find((f) => f.type === 'search');
  const currentSearchUrl = queryParams.search || '';

  const [searchInputValue, setSearchInputValue] = useState(currentSearchUrl);
  const debouncedSearch = useDebounce(searchInputValue, 500);

  // Sync state cleanly if the URL changes externally (e.g., browser back/forward buttons)
  const [prevSearchUrl, setPrevSearchUrl] = useState(currentSearchUrl);
  if (currentSearchUrl !== prevSearchUrl) {
    setPrevSearchUrl(currentSearchUrl);
    setSearchInputValue(currentSearchUrl);
  }

  // Update URL queries when debounced search value changes
  useEffect(() => {
    if (debouncedSearch !== currentSearchUrl) {
      setMultipleQueries({ search: debouncedSearch || undefined, page: 1 });
      if (searchField?.onChange) searchField.onChange(debouncedSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, currentSearchUrl]);

  // 2. Filter Extraction (Filters can be configured as 'select' or 'tabs')
  const filterFields = fields.filter((f) => f.type === 'select' || (f.type as string) === 'tabs');

  return (
    <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        {filterFields.map((field) => {
          const paramName = field.name.replace('-filter', '');
          const currentFieldValue = queryParams[paramName] || field.value || 'all';

          // Tabs Filter
          if ((field.type as string) === 'tabs' && field.options) {
            return (
              <div
                key={field.name}
                className="no-scrollbar w-full max-w-full overflow-x-auto overflow-y-hidden sm:w-auto"
              >
                <Tabs
                  value={currentFieldValue}
                  onValueChange={(val) => {
                    setMultipleQueries({ [paramName]: val === 'all' ? undefined : val, page: 1 });
                    if (field.onChange) field.onChange(val);
                  }}
                  className="w-max min-w-full"
                >
                  <TabsList className="border-border bg-card h-10! w-full justify-start overflow-hidden rounded-sm border p-0.5 shadow-xs">
                    {field.options.map((option) => (
                      <TabsTrigger
                        key={option.value}
                        value={option.value}
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-secondary hover:bg-muted h-full shrink-0 cursor-pointer rounded-xs px-3 py-1.5 text-xs font-semibold whitespace-nowrap capitalize transition-all sm:px-4 sm:text-sm"
                      >
                        {option.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            );
          }

          // Select Filter
          if (field.type === 'select' && field.options) {
            return (
              <div key={field.name} className="w-full sm:w-44">
                <Select
                  value={currentFieldValue}
                  onValueChange={(val) => {
                    setMultipleQueries({ [paramName]: val === 'all' ? undefined : val, page: 1 });
                    if (field.onChange) field.onChange(val);
                  }}
                >
                  <SelectTrigger
                    className={cn(
                      'border-border bg-card text-primary h-10! w-full rounded-sm border px-3 text-sm font-semibold shadow-none transition-all outline-none',
                      'focus:border-primary/50 focus:ring-primary/20 focus-visible:ring-primary/20 focus:ring-1 focus-visible:ring-1',
                    )}
                  >
                    <SelectValue placeholder={field.placeholder || 'Select option'} />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-popover text-popover-foreground border shadow-md">
                    {field.options.map((opt) => (
                      <SelectItem
                        key={opt.value}
                        value={opt.value}
                        className="focus:bg-muted focus:text-primary cursor-pointer transition-colors"
                      >
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* [RIGHT SIDE - SEARCH INPUT & ACTIONS] */}
      <div className="flex flex-wrap items-center gap-3 sm:justify-end">
        {/* Search Input Field */}
        {searchField && (
          <div className="relative w-full sm:w-auto">
            <Search size={15} className="text-secondary absolute top-1/2 left-4 -translate-y-1/2" />
            <input
              type="text"
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
              placeholder={searchField.placeholder || 'Search...'}
              className="border-border bg-card text-primary placeholder:text-secondary focus:border-primary/50 focus:ring-primary/20 w-full rounded-sm border py-2.5 pr-4 pl-10 text-sm transition-all outline-none focus:ring-1 sm:w-64"
            />
            {searchInputValue && (
              <button
                onClick={() => setSearchInputValue('')}
                className="text-secondary hover:text-primary absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>
        )}

        {/* Optional Data Export Button */}
        {showExport && (
          <button
            onClick={onExport}
            className="border-border bg-card text-secondary hover:text-primary hover:bg-muted flex h-10 cursor-pointer items-center gap-2 rounded-sm border px-4 text-sm font-semibold transition-all active:scale-[0.98]"
          >
            <Download size={15} className="text-secondary" />
            <span>{exportText}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default DynamicTableFilterBar;
