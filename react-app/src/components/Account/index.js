import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Account() {
    let account = useSelector(state => state.account?.info?.balance)

    return (
        <div>
            Balance: ${account}
        </div>
    )
}
