import { useState } from 'react';
import {CreateNote, NavBar,NoteUICollection, UpdateNote} from './ui-components'

import { withAuthenticator } from '@aws-amplify/ui-react';
import { DataStore } from 'aws-amplify';

function App({signOut}) {

  const [showCreateModal,setShowCreateModal]= useState(false);
  const [showUpdateModal,setShowUpdateModal]= useState(false);
  const [updateNote,setUpdateNote]=useState()

  return (
   <>
      <NavBar width='100%' marginBottom='20px' overrides={
        {
          Button31632483:{onClick:()=>{setShowCreateModal(true)}},
          Button31632487:{onClick:async()=>{
            signOut()
            await DataStore.clear();
          }}
    
        
        }}/>
      <div className='container'>
        <NoteUICollection overrideItems={({item,index})=>{
          return{
            overrides:{
              Vector31472745:{
                    
                        onClick:()=>{
                          setShowUpdateModal(true)
                          setUpdateNote(item)
            }}}
          }
        }}/>
      </div>
      <div className='modal'>
        <CreateNote display={!showCreateModal&&'none'} overrides={{MyIcon:{as:'button',onClick:()=>{setShowCreateModal(false)}}}}/>
      </div>
      <div className='modal'>
        <UpdateNote notes={updateNote} display={!showUpdateModal&&'none'} overrides={{MyIcon:{as:'button',onClick:()=>{setShowUpdateModal(false)}}}}/>
      </div>
   </>
  )
}
export default withAuthenticator(App)