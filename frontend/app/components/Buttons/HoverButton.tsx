"use client"

interface HoverButtonProps {
  mainText: string
  hoverText: string
  className?: string
}

export function HoverButton({ mainText, hoverText, className = "" }: HoverButtonProps) {
  return (
    <button
      className={`
        group relative m-0 h-auto cursor-pointer border-none bg-transparent p-0
        font-sans text-lg tracking-[3px] text-transparent
        text-stroke transition-all
        ${className}
      `}
    >
      <span className="actual-text">&nbsp;{mainText}&nbsp;</span>
      <span
        className="
          absolute inset-0 box-border w-0 overflow-hidden
          border-r-[6px] border-[#37FF8B] text-[#37FF8B]
          text-stroke-green transition-all duration-500
          group-hover:w-full group-hover:drop-shadow-[0_0_23px_#37FF8B]
        "
        aria-hidden="true"
      >
        &nbsp;{hoverText}&nbsp;
      </span>
    </button>
  )
}