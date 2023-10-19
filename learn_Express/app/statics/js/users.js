// 即時関数でモジュール化
// ユーザーリストを取得して、テーブルに挿入するメソッドをreturnする。
const usersModule = (()=>{
    return {
        fetchAllUsers: async()=>{
            const res = await fetch('http://localhost:3000/api/v1/users')
            const parsed = await res.json()
            const $tbody = document.getElementById('users-list')
            for (let i=0;i<parsed.length;i++){
                let values_Array = Object.values(parsed[i])
                const $tr = document.createElement('tr')
                values_Array.forEach((value)=>{
                    const $td = document.createElement('td')
                    $td.textContent = value
                    $tr.appendChild($td)
                })
                $tbody.appendChild($tr)
            }
        }
    }
})()