import React from 'react'

const ListView = ({productData}) => {
  return (
    <>
    <div className='flex flex-col items-center justify-center p-5 w-11/12 bg-blue-200 m-5 rounded-xl flex-wrap h-fit'>
        {productData.map((product, index)=> {
            return(
                <div className='w-4/5 rounded-lg flex overflow-hidden shadow-lg justify-evenly bg-white p-2 m-4 h-fit'>
                  <img className='w-20 rounded-full h-20' src={product.imgUrl} alt='Fashion Beauty' />
                  <div className='text-center m-2'>
                  <div className="text-xl font-bold"> {product.title}</div>
                  <p className="text-gray-700 text-base">{product.description}</p>
                    </div>
                    <div className="px-6 py-4 text-left">
                <button className="bg-blue-700 text-white p-2 m-1 rounded-xl">
                  Reply..
                </button>
              </div>
                 </div>
            )
        }
        )}
    </div>
    </>
    
    
  )
}

export default ListView
