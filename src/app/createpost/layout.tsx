'use client'

import PageTitle from "@/components/text/PageTitle";
import "./createPost.scss"

const CreatePostLayout = ({children,} : Readonly<{children: React.ReactNode;}>) => {
    return(
        <main className="createPost">
            <div className="header">
                <PageTitle title="expo."/>                
            </div>
            <section className="optionsContainer">
                {children}
            </section>
        </main>
    )
}

export default CreatePostLayout