import React from "react";
import Upload from '../../components/uploa'
import Create from '../../components/create'
import List from '../../components/list'
import Contacts from "../../components/Contacts"

function Index() {
    return (
        <div className="bg-gray-900">
            <div className="bg-gray-900 container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 pt-6 gap-8">

                <Upload />
                <Create />
                <List />

            </div>
            <h1 className='text-5xl text-center font-bold mx-auto py-10'> Contacts</h1>

            <Contacts />
        </div>
    );
}
export default Index;
