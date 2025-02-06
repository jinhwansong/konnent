import React from 'react'
import ProgramDetail from '../../_component/ProgramDetail';

export default function page({params}: {params: {id: string}}) {
  return <ProgramDetail id={params.id}/>; 
}
