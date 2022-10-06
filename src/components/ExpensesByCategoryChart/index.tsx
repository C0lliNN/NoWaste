import { useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useTheme } from 'styled-components';
import useMediaQuery from '../../hooks/media-query';
import NoDataCard from '../NoDataCard';
import Card from '../UI/Card';
import Modal from '../UI/Modal';

interface Props {
  expensesByCategory: Array<{ categoryName: string; expense: number }>;
}

const colors = ['#EF476F', '#06D6A0', '#FFD166', '#6694FF', '#118AB2'];

const renderCustomLegend = (category: string, expense: number): JSX.Element => {
  return (
    <span style={{ color: '#000' }}>
      <span style={{ display: 'inline-block', margin: '4px 10px' }}>{category}</span>
      <span>
        <Trans i18nKey="currency">$</Trans>
        {expense.toFixed(2)}
      </span>
    </span>
  );
};

export default function ExpensesByCategoryChart(props: Props): JSX.Element {
  const data = props.expensesByCategory.map((e) => ({
    name: e.categoryName,
    value: e.expense
  }));

  const { t } = useTranslation();

  const filteredData = useMemo(() => {
    if (data.length <= 4) {
      return [...data];
    }

    const filtered = data.slice(0, 3);
    filtered.push({
      name: t('Others'),
      value: data.slice(4).reduce((prev, curr) => prev + curr.value, 0)
    });

    return filtered;
  }, [data]);

  const theme: any = useTheme();

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const mediaQuery = useMediaQuery(`(min-width: ${theme.lgBreakpoint})`);

  const [showModal, setShowModal] = useState(false);

  function handleShowModal(): void {
    setShowModal(true);
  }

  function handleCloseModal(): void {
    setShowModal(false);
  }

  if (data.length === 0) {
    return <NoDataCard />;
  }

  return (
    <>
      <Card onClick={handleShowModal}>
        <ResponsiveContainer width="100%" height={mediaQuery ? 250 : 200}>
          <PieChart>
            <Pie dataKey="value" data={filteredData} innerRadius={40}>
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              align="right"
              verticalAlign="middle"
              layout="vertical"
              iconType="circle"
              formatter={(_, __, index) =>
                renderCustomLegend(filteredData[index].name, filteredData[index].value)
              }
            />
          </PieChart>
        </ResponsiveContainer>
      </Card>
      <Modal show={showModal} onClose={handleCloseModal} size="md">
        <Modal.Body>
          <ResponsiveContainer width="100%" height={600}>
            <PieChart>
              <Pie dataKey="value" data={data} innerRadius={80}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} spacing={10} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="horizontal"
                iconType="circle"
                formatter={(_, __, index) =>
                  renderCustomLegend(data[index].name, data[index].value)
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </Modal.Body>
      </Modal>
    </>
  );
}
