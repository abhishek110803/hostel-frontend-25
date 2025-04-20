function UpdateButton({ newSelectedRoom, handleClick }) {

  return (
    <>
      <button className={
        ` sticky  bottom-[5px] left-1/2 md:w-auto md:h-10 p-2 rounded-md z-1
        ${newSelectedRoom ?
          ' text-white  bg-cyan-500 '
          : 'bg-cyan-900 text-slate-50 cursor-not-allowed pointer-events-none '
        } `}
        onClick={handleClick} 
      >
        Update Details
      </button>
    </>
  )
}

export default UpdateButton;
