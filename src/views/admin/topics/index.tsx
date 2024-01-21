import AdminTopicTable from "./components/AdminTopicTable";

const Topics = () => {
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5">
        {/* <DevelopmentTable tableData={tableDataDevelopment} /> */}
        <AdminTopicTable />
      </div>

      {/* <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <ColumnsTable tableData={tableDataColumns} />

        <ComplexTable tableData={tableDataComplex} />
      </div> */}
    </div>
  );
};

export default Topics;
