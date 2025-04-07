"use client"

import React from 'react'
import { getAllFeed } from '../../../../graphql/actions/feed'

const page = () => {
    const { data } = getAllFeed()
    return (
        <div>page</div>
    )
}

export default page