'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Country {
    code: string
    name: string
    dialCode: string
    flag: string
}

const countries: Country[] = [
    { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
    { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
    { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
    { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
    { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
    { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
    { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵' },
    { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳' },
    { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷' },
    { code: 'MX', name: 'Mexico', dialCode: '+52', flag: '🇲🇽' },
    { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸' },
    { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹' },
    { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱' },
    { code: 'SE', name: 'Sweden', dialCode: '+46', flag: '🇸🇪' },
    { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭' },
    { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬' },
    { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪' },
    { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦' },
    { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦' },
]

interface PhoneInputProps {
    value: string
    onChange: (value: string) => void
    required?: boolean
    className?: string
    placeholder?: string
}

export default function PhoneInput({
    value,
    onChange,
    required = false,
    className = '',
    placeholder = 'Enter phone number',
}: PhoneInputProps) {
    const [selectedCountry, setSelectedCountry] = useState<Country>(countries[2]) // Default to India
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Parse initial value if provided
    useEffect(() => {
        if (value && !phoneNumber) {
            // Try to extract country code from value
            const country = countries.find((c) => value.startsWith(c.dialCode))
            if (country) {
                setSelectedCountry(country)
                setPhoneNumber(value.substring(country.dialCode.length).trim())
            } else {
                setPhoneNumber(value)
            }
        } else if (!value && phoneNumber) {
            // Reset phone number when value is cleared
            setPhoneNumber('')
        }
    }, [value, phoneNumber])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
                setSearchQuery('')
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        // Remove non-numeric characters except spaces, dashes, and parentheses
        const cleaned = input.replace(/[^\d\s\-()]/g, '')
        setPhoneNumber(cleaned)
        onChange(`${selectedCountry.dialCode} ${cleaned}`)
    }

    const handleCountrySelect = (country: Country) => {
        setSelectedCountry(country)
        setIsDropdownOpen(false)
        setSearchQuery('')
        onChange(`${country.dialCode} ${phoneNumber}`)
    }

    const filteredCountries = countries.filter(
        (country) =>
            country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            country.dialCode.includes(searchQuery) ||
            country.code.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className={`relative ${className}`}>
            <div className="flex gap-2">
                {/* Country Code Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-3 bg-secondary-900/80 border border-primary/30 text-foreground hover:border-primary transition-all rounded-md min-w-[100px] sm:min-w-[120px]"
                    >
                        <span className="text-2xl">{selectedCountry.flag}</span>
                        <span className="text-sm font-medium">{selectedCountry.dialCode}</span>
                        <svg
                            className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute z-50 mt-2 w-[calc(100vw-3rem)] sm:w-80 bg-secondary-900 border border-primary/30 rounded-lg shadow-2xl overflow-hidden"
                            >
                                {/* Search Input */}
                                <div className="p-3 border-b border-primary/20">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search country..."
                                        className="w-full px-3 py-2 bg-secondary-800 border border-primary/20 text-foreground placeholder-muted focus:outline-none focus:border-primary transition-all rounded-md text-sm"
                                    />
                                </div>

                                {/* Country List */}
                                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                                    {filteredCountries.length > 0 ? (
                                        filteredCountries.map((country) => (
                                            <button
                                                key={country.code}
                                                type="button"
                                                onClick={() => handleCountrySelect(country)}
                                                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-primary/10 transition-colors text-left ${selectedCountry.code === country.code ? 'bg-primary/20' : ''
                                                    }`}
                                            >
                                                <span className="text-2xl">{country.flag}</span>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-medium text-foreground truncate">
                                                        {country.name}
                                                    </div>
                                                    <div className="text-xs text-accent">{country.dialCode}</div>
                                                </div>
                                                {selectedCountry.code === country.code && (
                                                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                        ))
                                    ) : (
                                        <div className="px-4 py-8 text-center text-accent text-sm">
                                            No countries found
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Phone Number Input */}
                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    required={required}
                    placeholder={placeholder}
                    className="flex-1 px-4 py-3 bg-secondary-900/80 border border-primary/30 text-foreground placeholder-muted focus:outline-none focus:border-primary transition-all rounded-md"
                />
            </div>

            {/* Custom Scrollbar Styles */}
            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 212, 255, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 212, 255, 0.5);
        }
      `}</style>
        </div>
    )
}
