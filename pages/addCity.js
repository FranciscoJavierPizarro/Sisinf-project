export default function Test() {
    const city = {
      name:"lugo",
      publisherId:"test",
      publishingDate:"2022-09-29"
    }
  
    const handleSubmit = async () => {
      const res = await fetch("http://localhost:3000/api/cities", {
        method: "post",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(city)
      })
    }
  
    return (
      <h1 className="text-3xl font-bold underline">
        <button onClick={() => handleSubmit()}>click</button>
      </h1>
    );
  }