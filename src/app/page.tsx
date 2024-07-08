'use client'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useEffect, useState } from 'react'

export default function Home() {
  const [input, setInput] = useState<string>('')
  const [searchresult, setSearchresult] = useState<{
    result: string[]
    duration: number
  }>()

  useEffect(() => {
    const fetchData = async () => {
      if (!input) return setSearchresult(undefined)

      const res = await fetch(`https://fastapi.jayantissar8.workers.dev/api/search?q=${input}`)
      const data = (await res.json()) as { result: string[]; duration: number }
      setSearchresult(data)
    }

    fetchData()
  }, [input])

  return (
    <main className='h-screen w-screen flex flex-col items-center justify-center'>
      <div className=' duration-500 animate-in animate fade-in-5 slide-in-from-bottom-2.5'>
        <h1 className='text-4xl  md:text-6xl tracking-tight font-bold text-center'>SpeedSearch ⚡</h1>
        <p className='text-zinc-600 text-[0.7rem] md:text-lg max-w-prose text-center mt-4'>
          A high-performance API built with Hono, Next.js and Cloudflare. <br />{' '}
          Type a query below and get your result in miliseconds.
        </p>

        <div className='max-w-md w-full rounded-lg shadow-md flex items-center hover:shadow-lg transition duration-50 mt-2'>
          <Command className=' md:w-full flex'>
            <CommandInput
              value={input}
              onValueChange={setInput}
              placeholder='Search countries...'
              className='placeholder:text-zinc-500 md:placeholder:text-lg  p-1 md:text-2xl h-14 md:h-20'
            />
            <CommandList>
              {searchresult?.result.length === 0 ? (
                <CommandEmpty className=' md:text-xl'>No result found.</CommandEmpty>
              ) : null}

              {searchresult?.result ? (
                <CommandGroup heading='Result' className='text-2xl'>
                  {searchresult?.result.map((result) => (
                    <CommandItem className=' md:text-xl font-semibold'
                      key={result}
                      value={result}
                      onSelect={setInput}>
                      {result}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}

              {searchresult?.result ? (
                <>
                  <div className='h-px w-full bg-zinc-200' />

                  <p className='p-2 text-xs md:text-xl flex items-center justify-center text-zinc-600'>
                    Found {searchresult.result.length} result in{' '}
                    {searchresult?.duration.toFixed(0)}ms
                  </p>
                </>
              ) : null}
            </CommandList>
          </Command>
        </div>
      </div>
      <div className='text-center font-semibold text-slate-600 p-4 text-xs md:text-lg'>
        Made by Jayant Issar
      </div>
    </main>
  )
}
