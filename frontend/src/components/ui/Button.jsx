export default function Button({

    children,

    className="",

    variant="primary",

    ...props

}){

const styles={

    primary:"bg-black text-white hover:-translate-y-1 hover:shadow-xl",

    secondary:"bg-white border border-neutral-300 hover:bg-neutral-50"

}

return(

    <button

        className={`

            inline-flex

            items-center

            justify-center

            rounded-full

            px-8

            py-4

            font-medium

            transition-all

            duration-300

            ${styles[variant]}

            ${className}

            `}

            {...props}

        >

    {children}

    </button>

)

}