import React from 'react'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps extends PagePaginationProps {
  onPageChange: (page: number) => void
}

export type PagePaginationProps = {
  currentPage:number,
  maxPages:number
}

export default function Pagination({ currentPage, maxPages, onPageChange }: PaginationProps) {
  return (
    <nav className="flex justify-center items-center space-x-2" aria-label="Pagination">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {currentPage > 2 && (
        <>
          <Button variant="outline" onClick={() => onPageChange(1)}>1</Button>
          {currentPage > 3 && <span className="px-2">...</span>}
        </>
      )}
      
      {currentPage > 1 && (
        <Button variant="outline" onClick={() => onPageChange(currentPage - 1)}>
          {currentPage - 1}
        </Button>
      )}

      <Button variant="default" aria-current="page" disabled className='disabled:bg-blue-500 disabled:opacity-100'>
        {currentPage}
      </Button>

      {currentPage < maxPages && (
        <Button variant="outline" onClick={() => onPageChange(currentPage + 1)}>
          {currentPage + 1}
        </Button>
      )}

      {currentPage < maxPages - 1 && (
        <>
          {currentPage < maxPages - 2 && <span className="px-2">...</span>}
          <Button variant="outline" onClick={() => onPageChange(maxPages)}>
            {maxPages}
          </Button>
        </>
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === maxPages}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  )
}
