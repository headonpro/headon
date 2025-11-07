import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, AlertCircle } from 'lucide-react'

interface TableColumn {
  header: string
  accessor: string
  align?: 'left' | 'center' | 'right'
  highlight?: boolean
}

interface BlogTableRow {
  [key: string]: string | number | boolean | React.ReactNode
}

interface BlogTableProps {
  title?: string
  caption?: string
  columns: TableColumn[]
  data: BlogTableRow[]
  variant?: 'default' | 'pricing' | 'comparison' | 'features'
  responsive?: boolean
}

/**
 * BlogTable Component
 * Modern, responsive table for blog posts with multiple variants
 * Automatically handles mobile responsiveness with card layout
 */
export function BlogTable({
  title,
  caption,
  columns,
  data,
  variant = 'default',
  responsive = true
}: BlogTableProps) {
  // Format cell content based on variant
  const formatCell = (value: string | number | boolean | React.ReactNode, column: TableColumn) => {
    if (variant === 'pricing') {
      // Highlight prices
      if (typeof value === 'string' && (value.includes('EUR') || value.includes('€'))) {
        return <span className="font-semibold text-primary">{value}</span>
      }
      // Free tier
      if (value === '0' || value === 'Kostenlos' || value === '0 EUR') {
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Kostenlos
          </Badge>
        )
      }
      // On request
      if (value === 'auf Anfrage') {
        return (
          <Badge variant="outline" className="border-gray-300">
            auf Anfrage
          </Badge>
        )
      }
    }

    if (variant === 'features') {
      // Feature checkmarks
      if (value === true || value === '✓' || value === '✅') {
        return <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
      }
      if (value === false || value === '✗' || value === '❌') {
        return <AlertCircle className="h-5 w-5 text-gray-400 mx-auto" />
      }
    }

    // Bold first column for better readability
    if (column === columns[0] && typeof value === 'string') {
      return <span className="font-semibold">{value}</span>
    }

    return value
  }

  // Mobile card layout for responsive tables
  if (responsive) {
    return (
      <div className="my-8">
        {title && (
          <h3 className="mb-4 text-xl font-bold text-gray-900">{title}</h3>
        )}

        {/* Desktop Table */}
        <div className="hidden md:block">
          <Card className="overflow-hidden">
            <Table>
              {caption && <TableCaption>{caption}</TableCaption>}
              <TableHeader>
                <TableRow className="bg-gray-50">
                  {columns.map((column) => (
                    <TableHead
                      key={column.accessor}
                      className={`font-semibold ${
                        column.align === 'center' ? 'text-center' :
                        column.align === 'right' ? 'text-right' : 'text-left'
                      } ${column.highlight ? 'bg-primary/5' : ''}`}
                    >
                      {column.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, rowIndex) => (
                  <TableRow key={rowIndex} className="hover:bg-gray-50/50">
                    {columns.map((column) => (
                      <TableCell
                        key={column.accessor}
                        className={`${
                          column.align === 'center' ? 'text-center' :
                          column.align === 'right' ? 'text-right' : 'text-left'
                        } ${column.highlight ? 'bg-primary/5 font-medium' : ''}`}
                      >
                        {formatCell(row[column.accessor], column)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* Mobile Card Layout */}
        <div className="md:hidden space-y-4">
          {data.map((row, rowIndex) => (
            <Card key={rowIndex} className="p-4">
              {columns.map((column) => (
                <div
                  key={column.accessor}
                  className="flex justify-between items-center py-2 border-b last:border-0"
                >
                  <span className="text-sm text-gray-600">{column.header}</span>
                  <span className="font-medium text-right">
                    {formatCell(row[column.accessor], column)}
                  </span>
                </div>
              ))}
            </Card>
          ))}
        </div>

        {caption && (
          <p className="mt-2 text-sm text-gray-600">{caption}</p>
        )}
      </div>
    )
  }

  // Non-responsive table (classic layout)
  return (
    <div className="my-8">
      {title && (
        <h3 className="mb-4 text-xl font-bold text-gray-900">{title}</h3>
      )}
      <Card className="overflow-hidden">
        <Table>
          {caption && <TableCaption>{caption}</TableCaption>}
          <TableHeader>
            <TableRow className="bg-gray-50">
              {columns.map((column) => (
                <TableHead
                  key={column.accessor}
                  className={`font-semibold ${
                    column.align === 'center' ? 'text-center' :
                    column.align === 'right' ? 'text-right' : 'text-left'
                  }`}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell
                    key={column.accessor}
                    className={column.align === 'center' ? 'text-center' :
                               column.align === 'right' ? 'text-right' : 'text-left'}
                  >
                    {formatCell(row[column.accessor], column)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}