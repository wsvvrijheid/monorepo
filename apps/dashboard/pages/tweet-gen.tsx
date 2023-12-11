'use client';

import { useState } from 'react';

import { useCompletion } from 'ai/react';

export default function Completion() {

    const [generatedPosts, setGeneratedPosts] = useState<string[]>()
    const [numberOfPosts, setNumberOfPosts] = useState<number>()
    const [charLimit, setCharLimit] = useState<number>()
    const [isDone, setIsDone] = useState<boolean>(false)

    const {
        completion,
        input,
        stop,
        isLoading,
        handleInputChange,
        handleSubmit,
    } = useCompletion({
        api: '/api/completion',
        body: {
            numberOfPosts,
            charLimit
        },
        onFinish(prompt, completion) {
            setIsDone(true)
            setGeneratedPosts(JSON.parse(completion))
        },
    });

    return (
        <div className='p-2'>
            <h1 className='mt-2 mb-1 text-orange-400 text-4xl font-bold md:text-5xl lg:text-6xl text-center'>Post Generator</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={input}
                    className="w-full text-black rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-3 p-1.5"
                    rows={12}
                    placeholder="Enter an article..."
                    onChange={handleInputChange}
                />
                <button
                    type="button"
                    onClick={stop}
                    className="bg-purple-900 rounded-xl text-white font-medium px-4 py-2 sm:mb-4 mb-2 hover:bg-black/80 w-full"
                >

                    Stop
                </button>
                <button
                    disabled={isLoading}
                    type="submit"
                    className="bg-orange-500 rounded-xl text-white font-medium px-4 py-2 sm:mb-4 mb-2 hover:bg-black/80 w-full"
                >
                    Generate Posts
                </button>
            </form>
            <div>{completion}</div>
        </div>
    );
}