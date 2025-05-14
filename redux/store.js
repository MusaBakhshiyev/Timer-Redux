import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import stopWatchSlice from './stopWatchSlice'
const store = configureStore({
    reducer: {
       stopWatchSlice : stopWatchSlice
    }
})

export default store;