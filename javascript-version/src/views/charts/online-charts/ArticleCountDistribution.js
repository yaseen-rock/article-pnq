// ChartjsBarChart.js
import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

const ArticleCountDistribution = props => {
  const { companyData } = props

  const renderCompanyRow = (company, articleCount) => (
    <TableRow key={company}>
      <TableCell>{company}</TableCell>
      <TableCell>{articleCount.today}</TableCell>
      <TableCell>{articleCount.lastWeek}</TableCell>
      <TableCell>{articleCount.lastMonth}</TableCell>
      <TableCell>{articleCount.lastThreeMonths}</TableCell>
      <TableCell>{articleCount.overall}</TableCell>
    </TableRow>
  )

  return (
    <Card>
      <CardHeader title='Article Count Distribution' />
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Company Name</TableCell>
                <TableCell>Today</TableCell>
                <TableCell>Last Week</TableCell>
                <TableCell>Last Month</TableCell>
                <TableCell>Last Three Months</TableCell>
                <TableCell>Overall</TableCell>
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default ArticleCountDistribution
