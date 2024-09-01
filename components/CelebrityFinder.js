import React, { useState } from 'react';

export default function CelebrityFinder() {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [celebrity, setCelebrity] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formattedDate = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`; // "MM-DD" 형식으로 포맷
    const response = await fetch('/data.json');
    const data = await response.json();
    setTimeout(() => {
      setCelebrity(data[formattedDate] ? data[formattedDate][0] : null);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          유명인 생일 찾기
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          자신의 생일을 입력하면 그날 태어난 유명인을 확인할 수 있습니다.
        </p>
      </div>
      <div className="mt-8 space-y-6">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <label className="text-3xl font-medium text-gray-700 dark:text-gray-300 mt-4 mb-2" htmlFor="birthday">
                  생일 (월-일)
                </label>
                <div className="flex space-x-4 justify-center mt-2">
                  <select
                    className="block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg bg-[#dfc2ed] hover:bg-[#c9b0e1] transition ease-in-out duration-150"
                    name="date_of_birth:mon"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    required
                  >
                    <option value="">월</option>
                    {[...Array(12).keys()].map((m) => (
                      <option key={m + 1} value={m + 1}>{`${m + 1}월`}</option>
                    ))}
                  </select>
                  <select
                    className="block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg bg-[#dfc2ed] hover:bg-[#c9b0e1] transition ease-in-out duration-150"
                    name="date_of_birth:day"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    required
                  >
                    <option value="">일</option>
                    {[...Array(31).keys()].map((d) => (
                      <option key={d + 1} value={d + 1}>{`${d + 1}일`}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <button
                  className="w-full rounded-md bg-indigo-600 py-3 px-5 text-xl font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  type="submit"
                >
                  확인하기
                </button>
              </div>
            </form>
          </div>
        </div>
        {loading && (
          <div className="text-center text-gray-600 mt-4">
            찾는중...
          </div>
        )}
        {!loading && celebrity && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mt-6">
            <div className="flex flex-col items-center">
              <div className="w-full">
                <img 
                  alt={celebrity.name} 
                  className="w-full object-contain" 
                  src={celebrity.image} 
                  style={{ height: '400px', maxHeight: '400px' }} 
                />
              </div>
              <div className="p-8 text-center">
                <a
                  className="block mt-2 text-3xl leading-tight font-medium text-gray-900 dark:text-gray-100 hover:underline"
                  href="#"
                >
                  {celebrity.name}
                </a>
                <p className="mt-2 text-xl text-gray-600 dark:text-gray-400">
                  태어난 연도: {celebrity.year}
                </p>
                <p className="mt-2 text-xl text-gray-600 dark:text-gray-400">
                  {celebrity.explain}
                </p>
              </div>
            </div>
          </div>
        )}
        {!loading && !celebrity && month && day && (
          <div className="text-center text-red-500 mt-4">
            해당 생일에 유명인을 찾을 수 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
