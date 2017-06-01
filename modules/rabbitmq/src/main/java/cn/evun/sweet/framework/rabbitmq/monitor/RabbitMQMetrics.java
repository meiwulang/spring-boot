package cn.evun.sweet.framework.rabbitmq.monitor;

import com.codahale.metrics.Counter;
import com.codahale.metrics.Gauge;
import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.Timer;

/**
 * rabbitMQ 监控类
 * 
 * @author shiguiming
 *
 */
public class RabbitMQMetrics {
	
	// 发送计时
	private Timer sendTimer;
	// 消费计时
	private Timer consumeTimer;
	// 监控类名
	private String className;
	// 发送成功数
	private Counter sendSuccessCounter;
	//　发送失败数
	private Counter sendFailCounter;
	// 发送成功率
	private Gauge<Double> sendSuccessRate;
	
	
	final MetricRegistry metrics = new MetricRegistry();
	
	public MetricRegistry getMetricRegistry() {
		return metrics;
	}
	
	@SuppressWarnings("unused")
	private RabbitMQMetrics() {
	}
	
	public RabbitMQMetrics(String className) {
		this.className = className;
		init();
	}
	
	public void init() {
		
		sendTimer = metrics.timer(MetricRegistry.name(className, "sendTime"));
		consumeTimer = metrics.timer(MetricRegistry.name(className, "cosumeTime"));
		sendSuccessCounter = metrics.counter(MetricRegistry.name(className, "sendSuccessCount"));
		sendFailCounter = metrics.counter(MetricRegistry.name(className, "sendFailCount"));
		
		sendSuccessRate = new Gauge<Double>() {
			@Override
			public Double getValue() {
				if(sendSuccessCounter.getCount() == 0 && sendFailCounter.getCount() == 0){
					return 1D;
				}
				return (Double.valueOf(sendSuccessCounter.getCount())/(sendSuccessCounter.getCount() +sendFailCounter.getCount()));
			}
		};
		metrics.register(MetricRegistry.name(className, "sendSuccessRate", "rate"),sendSuccessRate);
		
		//TODO MOVED TO RabbitMQConfiguration.java
		/*ConsoleReporter reporter = ConsoleReporter.forRegistry(metrics)
			       .convertRatesTo(TimeUnit.SECONDS)
			       .convertDurationsTo(TimeUnit.MILLISECONDS)
			       .build();
			   reporter.start(15, TimeUnit.SECONDS);*/
	}
	
	/**
	 * 发送时间计时器
	 * @return
	 */
	public Timer.Context startSendTiming() {
		return sendTimer.time();
	}
	
	/**
	 * 消费时间计时器
	 * @return
	 */
	public Timer.Context startConsumeTiming() {
		return consumeTimer.time();
	}
	
	/**
	 * 发送成功数递增
	 */
	public void incSendSuccessCount() {
		sendSuccessCounter.inc();
	}
	
	/**
	 * 发送失败数量递增
	 */
	public void incSendFailCount() {
		sendFailCounter.inc();
	}
}
