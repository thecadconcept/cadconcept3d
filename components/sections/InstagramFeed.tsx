'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

interface InstagramFeedProps {
    username: string
}

interface InstagramPost {
    id: string
    media_url: string
    permalink: string
    caption?: string
    media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
}

interface InstagramProfile {
    username: string
    posts_count: number
    followers_count: number
    following_count: number
    profile_picture_url?: string
}

export default function InstagramFeed({ username }: InstagramFeedProps) {
    const [posts, setPosts] = useState<InstagramPost[]>([])
    const [profile, setProfile] = useState<InstagramProfile | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Fallback Mock Data
    const mockProfile = {
        username: username,
        posts_count: 124,
        followers_count: 5300,
        following_count: 1200,
        profile_picture_url: ''
    }

    const mockPosts: InstagramPost[] = [
        { id: '1', media_url: '', permalink: '#', media_type: 'IMAGE' },
        { id: '2', media_url: '', permalink: '#', media_type: 'IMAGE' },
        { id: '3', media_url: '', permalink: '#', media_type: 'IMAGE' },
        { id: '4', media_url: '', permalink: '#', media_type: 'IMAGE' },
        { id: '5', media_url: '', permalink: '#', media_type: 'IMAGE' },
        { id: '6', media_url: '', permalink: '#', media_type: 'IMAGE' },
    ]

    useEffect(() => {
        const fetchInstagramData = async () => {
            setIsLoading(true)
            try {
                // Fetch from our local API route
                const res = await fetch('/api/instagram')

                if (res.status === 503) {
                    console.info('Instagram Token missing, using mock data.')
                    setProfile(mockProfile)
                    setPosts(mockPosts)
                    return
                }

                if (!res.ok) throw new Error('Failed to fetch from API')

                const data = await res.json()

                // Use API data, fill missing profile stats with mocks (since Basic API is limited)
                setPosts(data.posts || mockPosts)
                setProfile({
                    ...mockProfile,
                    username: data.profile?.username || username,
                    // Keep mock stats as Basic API doesn't return followers
                    followers_count: mockProfile.followers_count,
                    following_count: mockProfile.following_count
                })

            } catch (err) {
                console.error('Instagram Loader Error:', err)
                // Fallback to mock on error
                setProfile(mockProfile)
                setPosts(mockPosts)
            } finally {
                setIsLoading(false)
            }
        }

        fetchInstagramData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 border-b border-white/5 pb-10"
        >
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-orange-500 to-purple-600">
                        <div className="w-full h-full bg-black rounded-full p-1">
                            <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center font-bold text-xl text-white overflow-hidden">
                                {profile?.profile_picture_url ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={profile.profile_picture_url} alt={username} className="w-full h-full object-cover" />
                                ) : (
                                    <span>{username.slice(0, 2).toUpperCase()}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-heading font-bold text-xl text-white flex items-center gap-2">
                            {username}
                            <span className="text-blue-500 text-sm">✓</span>
                        </h4>
                        <p className="text-accent text-sm">@{username.toLowerCase().replace(/\s/g, '')} • Engineering & Design</p>
                    </div>
                </div>

                <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                        <span className="block font-bold text-white text-lg">
                            {isLoading ? '-' : profile?.posts_count}
                        </span>
                        <span className="text-accent text-xs">Posts</span>
                    </div>
                    <div className="text-center">
                        <span className="block font-bold text-white text-lg">
                            {isLoading ? '-' : (profile?.followers_count ? (profile.followers_count / 1000).toFixed(1) + 'k' : 0)}
                        </span>
                        <span className="text-accent text-xs">Followers</span>
                    </div>
                    <div className="text-center">
                        <span className="block font-bold text-white text-lg">
                            {isLoading ? '-' : (profile?.following_count ? (profile.following_count / 1000).toFixed(1) + 'k' : 0)}
                        </span>
                        <span className="text-accent text-xs">Following</span>
                    </div>
                    <Button variant="primary" size="sm" className="rounded-full px-6 ml-4" onClick={() => window.open(`https://instagram.com/${username}`, '_blank')}>
                        Follow
                    </Button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {isLoading ? (
                    // Skeleton Loading
                    [...Array(6)].map((_, i) => (
                        <div key={i} className="aspect-square rounded-xl bg-white/5 animate-pulse" />
                    ))
                ) : (
                    posts.map((post) => (
                        <motion.div
                            key={post.id}
                            className="aspect-square rounded-xl bg-white/5 border border-white/10 relative overflow-hidden group cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            onClick={() => window.open(post.permalink, '_blank')}
                        >
                            {post.media_url ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={post.media_url} alt={post.caption || "Instagram Post"} className="w-full h-full object-cover" />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-30 group-hover:opacity-50 transition-opacity" />
                            )}

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                <span className="text-white text-2xl">❤️</span>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </motion.div>
    )
}
