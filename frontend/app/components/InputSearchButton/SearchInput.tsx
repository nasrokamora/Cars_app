"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

interface SearchInputProps {
  placeholder?: string
  onSearch?: (query: string, category: string) => void
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "ghost" | "outline"
}

export function SearchInput({
  placeholder = "البحث...",
  onSearch,
  className,
  size = "md",
  variant = "default",
}: SearchInputProps) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all") 
  const [isFocused, setIsFocused] = useState(false)

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query.trim(), category)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault() // 👈 حتى لا يعمل reload
      handleSearch()
    }
  }

  const clearSearch = () => {
    setQuery("")
    if (onSearch) {
      onSearch("", category)
    }
  }

  const sizeClasses = {
    sm: "h-8 text-sm",
    md: "h-10 text-base",
    lg: "h-12 text-lg",
  }

  const buttonSizeClasses = {
    sm: "h-6 w-6 p-1",
    md: "h-8 w-8 p-1.5",
    lg: "h-10 w-10 p-2",
  }

  return (
    <div className={cn("flex items-center gap-4 ", className)}>
      {/* حقل البحث */}
      <div
        className={cn(
          "relative flex w-full flex-grow items-center rounded-lg border transition-all duration-200",
          isFocused && "ring-2 ring-ring ring-offset-2",
          variant === "default" && "border-input bg-[#213045]",
          variant === "ghost" && "border-transparent bg-muted/50",
          variant === "outline" && "border-border bg-transparent",
        )}
      >
        <Search
          className={cn(
            "absolute left-3 text-muted-foreground transition-colors",
            size === "sm" && "h-4 w-4",
            size === "md" && "h-5 w-5",
            size === "lg" && "h-6 w-6",
            isFocused && "text-foreground",
          )}
        />
        
        <Label className="sr-only">Search</Label>
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "border-0 bg-transparent pl-10 pr-20 focus-visible:ring-0 focus-visible:ring-offset-0",
            sizeClasses[size],
          )}
        />

        <div className="absolute right-2 flex items-center gap-1">
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className={cn("text-muted-foreground hover:text-foreground", buttonSizeClasses[size])}
            >
              <X className="h-4 w-4" />
            </Button>
          )}

          <Button
            type="button"
            size="sm"
            onClick={handleSearch}
            disabled={!query.trim() && !category}
            className={cn(
              "bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50",
              buttonSizeClasses[size],
            )}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* الـ Select */}
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-[180px] bg-[#0f1d2d] text-white">
          <SelectValue placeholder="اختر الفئة" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">all</SelectItem>
          <SelectItem value="cars">cars</SelectItem>
          <SelectItem value="trucks">trucks</SelectItem>
          <SelectItem value="motorcycles">motorcycles</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
