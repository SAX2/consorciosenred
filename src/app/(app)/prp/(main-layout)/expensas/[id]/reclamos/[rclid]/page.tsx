import React from 'react'

const page = ({ params: { rclid } }: { params: { rclid: string } }) => {
  return (
    <div>{rclid}</div>
  )
}

export default page