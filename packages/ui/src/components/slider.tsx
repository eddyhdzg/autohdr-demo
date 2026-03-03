"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "../lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  tooltipRender,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & {
  tooltipRender?: (value: number) => React.ReactNode
}) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn("data-horizontal:w-full data-vertical:h-full", className)}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:w-auto data-vertical:flex-col py-3">
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative h-1.5 w-full grow overflow-hidden rounded-none bg-muted-foreground/20 select-none"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="rounded-none bg-primary select-none data-horizontal:h-full data-vertical:w-full"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className={cn(
              "block size-5 shrink-0 rounded-none border-2 border-primary bg-background shadow-sm transition-[color,box-shadow] select-none",
              "ring-ring/50 hover:ring-2 focus-visible:ring-2 focus-visible:outline-hidden active:ring-2",
              "disabled:pointer-events-none disabled:opacity-50",
              tooltipRender && "group"
            )}
          >
            {tooltipRender && (
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded-none bg-primary text-primary-foreground text-xs px-2 py-1 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100 transition-opacity pointer-events-none">
                {tooltipRender(_values[index])}
              </span>
            )}
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
