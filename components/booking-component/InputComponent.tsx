"use client"

type InputProps = {
  label:string
  type:string
  placeholder?:string
  onChange?: (e:React.ChangeEvent<HTMLInputElement>) => void
  id:string
  name:string
  readonly?:boolean
  value?: string | number
}

export function InputComponent({label,readonly=false, value, type, placeholder, onChange, id, name}:InputProps){
    return(
        <div className="mb-4">
            <label className="block mb-2.5 text-sm font-medium text-heading">
              {label}
            </label>
            <input
              type={type}
              name={name}
              id={id}
              value={value}
              className="bg-neutral-secondary-medium border rounded-lg border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder={placeholder}
              onChange={onChange}
              readOnly={readonly}
              required
            />
        </div>
    )
}