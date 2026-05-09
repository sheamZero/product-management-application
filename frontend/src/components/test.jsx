    {
                    user && (
                        <div className="px-6 py-5 border-b flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-semibold overflow-hidden">
                                {user?.image ? (
                                    <img
                                        src={user?.image}
                                        alt={user?.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    user?.name?.slice(0, 2)?.toUpperCase()
                                )}
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold">
                                    {user?.name}
                                </h3>

                                <p className="text-xs text-gray-500">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    )
                }
