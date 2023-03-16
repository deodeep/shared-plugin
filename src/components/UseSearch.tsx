import { useState } from 'react'
import { useDebounce } from '../helper'
import { SearchProps, User } from '../types'

export const UseSearch = ({ onSearch }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchResults, setSearchResults] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const debouncedOnSearch = useDebounce(async (searchTerm: string) => {
    setIsLoading(true)
    try {
      const results = await onSearch(searchTerm)
      setSearchResults(results)
      setError(null)
    } catch (error) {
      setSearchResults([])
      setError(error.message)
    }
    setIsLoading(false)
  }, 500)

  const handleSearchTermChange = (searchTerm: string) => {
    setSearchTerm(searchTerm)
    debouncedOnSearch(searchTerm)
  }

  return { searchTerm, handleSearchTermChange, searchResults, isLoading, error }
}
